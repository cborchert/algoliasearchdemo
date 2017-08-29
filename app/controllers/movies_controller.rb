class MoviesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def show
        @movie = Movie.find(params[:id])
    end

    def create
        @movie = Movie.create(movie_params);

        # The following saves 200ms to 2000ms of transaction time.
        # Does it have any negative consequences??
        # Movie.without_auto_index do
            # @movie = Movie.create(movie_params);
        # end
        # @movie.index!

        render json: @movie
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
end
