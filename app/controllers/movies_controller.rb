class MoviesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def show
        @movie = Movie.find(params[:id])
    end

    def create

        Movie.without_auto_index do
            @movie = Movie.create(movie_params);
            # set new movie objectID based on last id in db
            # this will allow us to save the movie directly and push into the db
            # what we should be doing, since this will possibly create messes with several operations at once,
            # is to go ahead and create the record, with Movie.without_auto_index
            # then to update it.
            #@movie.objectID = Movie.maximum(:id).next
            @movie.objectID = @movie.id
            @movie.save
            respond_to do |format|
                format.json { render json: @movie }
            end
        end
        Movie.reindex
    end

    private
        def movie_params
            params.require(:movie).permit!
        end
end
