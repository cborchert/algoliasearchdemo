class MoviesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def show
        @movie = Movie.find(params[:id])
    end

    def create

        objectValid = true
        reason = ''

        #Remove everything that is not a valid key
        filtered_params = movie_params.slice('title', 'image', 'color', 'actors', 'actor_facets', 'alternative_titles', 'genre', 'rating', 'score', 'year')
        # Validate values
        filtered_params.each_pair do |key, value|

            if key == 'actors' || key == 'actor_facets' || key == 'genre' || key == 'alternative_titles'
                #must be an array
                if !filtered_params[key].kind_of?(Array)
                    objectValid = false
                    reason = "#{key} is not an array"
                    break
                else
                    #whose children are all string
                    filtered_params[key].each_with_index do |subvalue, subkey|

                        if filtered_params[key][subkey].is_a? String
                            filtered_params[key][subkey] = sanitize filtered_params[key][subkey]
                        else
                            objectValid = false
                            reason = "#{key}#{subkey} is not a string"
                            break
                        end
                    end
                end
            elsif key == 'rating' || key == 'score'
                unless filtered_params[key] == ''
                    #typecast to float
                    filtered_params[key] = filtered_params[key].to_f
                    # 0 <= value <= 10
                    if filtered_params[key] < 0 || filtered_params[key] > 10
                        objectValid = false
                        reason = "#{key} is not between 0 and 10"
                        break
                    end
                    if key == 'rating'
                        # value <= 5
                        if filtered_params[key] > 5
                            objectValid = false
                            reason = "#{key} is not between 0 and 5"
                            break
                        end
                    end
                end
            elsif key == 'year'
                unless filtered_params[key] == ''
                    #typecast to integer
                    filtered_params[key] = filtered_params[key].to_i
                    # >= 1800
                    if filtered_params[key] < 1800
                        objectValid = false
                        reason = "#{key} is not above 1800"
                        break
                    end
                end
            else
                if filtered_params[key].is_a? String
                    #must be a string
                    #sanitize
                    filtered_params[key] = sanitize filtered_params[key]
                    if key == 'title' && filtered_params[key].length < 1
                        #required
                        objectValid = false
                        reason = "#{key} is required"
                        break
                    elsif key == 'color'
                        unless filtered_params[key] =~ /\A#(\h{3}|\h{6})\Z/
                            #must be a valid color
                            objectValid = false
                            reason = "#{key} is not a valid color"
                            break
                        end
                    end
                else
                    objectValid = false
                    reason = "#{key} is not a string"
                    break
                end
            end

        end

        filtered_params['objectID'] = ''

        # puts filtered_params
        # puts objectValid
        # puts reason
        unless objectValid
            render json: filtered_params, status: :unprocessable_entity
        else
            @movie = Movie.create(filtered_params);

            # The following saves 200ms to 2000ms of transaction time.
            # Does it have any negative consequences??
            # Movie.without_auto_index do
            #     @movie = Movie.create(movie_params);
            # end
            # @movie.index!

            render json: @movie
        end

    end

    def destroy
        movie = Movie.find(params[:id])
        movie.destroy!

        # the following might be as efficient, or maybe even more so
        # destroy the record inside a without_auto_index block, and then afterwards
        # index = Algolia::Index.new("index_name")
        # index.delete_object(id)
        msg = { :status => "ok", :message => "Movie with id #{params[:id]} deleted" }
        render :json => msg
    end

    private
        def movie_params
            params.require(:movie).permit!
        end
        def sanitize(string)
            return ActionController::Base.helpers.sanitize string
        end
end
