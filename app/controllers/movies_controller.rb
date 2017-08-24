class MoviesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def show
        @movie = Movie.find(params[:id])
    end

    def create
        Movie.without_auto_index do
            @movie = Movie.create(movie_params);
            # set new movie objectID based on its id
            # this is necessary for the
            @movie.objectID = @movie.id
            @movie.save
            respond_to do |format|
                format.json { render json: @movie }
            end
        end
        Movie.reindex
    end

    def destroy
        Movie.find(params[:id]).destroy
        respond_to do |format|
            msg = { :status => "ok", :message => "Movie with id #{params[:id]} deleted" }
            format.json { render :json => msg }
        end
    end

    private
        def movie_params
            params.require(:movie).permit!
        end
end
