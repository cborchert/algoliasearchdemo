class MoviesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def show
        @movie = Movie.find(params[:id])
    end

    def create
        # Movie.without_auto_index do
            puts movie_params;
            @movie = Movie.create(movie_params);
            # set new movie objectID based on its id
            # this is necessary for the
            # @movie.objectID = @movie.id
            # @movie.save
        # end
        # only update the current entry. Saves on transaction time, but will it lead to inaccuracies?
        # @movie.index!
        # Movie.reindex
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
