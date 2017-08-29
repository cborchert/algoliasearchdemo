class MoviesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def show
        @movie = Movie.find(params[:id])
    end

    def create
        Movie.without_auto_index do
            puts movie_params;
            @movie = Movie.create(movie_params);
            # set new movie objectID based on its id
            # this is necessary for the
            @movie.objectID = @movie.id
            @movie.save
        end
        Movie.reindex
        render json: @movie
    end

    def destroy
        Movie.find(params[:id]).destroy
        Movie.reindex
        msg = { :status => "ok", :message => "Movie with id #{params[:id]} deleted" }
        render :json => msg
    end

    private
        def movie_params
            params.require(:movie).permit!
        end
end
