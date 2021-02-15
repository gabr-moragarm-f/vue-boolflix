var app = new Vue({
  el: '#root',
  data:{
    optionGenreFilter: '',
    userSearchInput: '',
    noResults: false,
    searchResultMovie: [],
    searchResultShows: [],
    lastSearch: '',
    filmCast: [],
    showCast: [],
    movieGenres: [],
    showGenres: []
  },
  mounted() {
    let self = this;

    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=8ef7b50081ce77b4e68be605e52ac6b2')
    .then(function(response) {
      self.movieGenres = response.data.genres;
    });

    axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=8ef7b50081ce77b4e68be605e52ac6b2')
    .then(function(response) {
      self.showGenres = response.data.genres;
    });
  },
  methods:{
    searchMoviesAndShows: function() {
      this.searchMovies();

      this.searchShows();

      if (this.searchResultMovie.length === 0 && this.searchResultShows.length === 0) {
        this.noResults = true;
      }else {
        this.noResults = false;
      }
    },
    searchMovies:function() {
      let self = this;


      axios.get('https://api.themoviedb.org/3/search/movie?api_key=8ef7b50081ce77b4e68be605e52ac6b2&query=' + encodeURI(this.userSearchInput))
      .then(function(response) {
        self.searchResultMovie = response.data.results;

        self.userSearchInput = '';
      });

      self.lastSearch = self.userSearchInput;
    },
    searchShows:function() {
      let self = this;

      axios.get('https://api.themoviedb.org/3/search/tv?api_key=8ef7b50081ce77b4e68be605e52ac6b2&query=' + encodeURI(this.userSearchInput))
      .then(function(response) {
        self.searchResultShows = response.data.results;

        self.userSearchInput = '';
      });

      self.lastSearch = self.userSearchInput;
    },
    filterForGenre:function(ids) {
      if (this.optionGenreFilter === '') {
        return true
      }

      if (ids.includes(this.optionGenreFilter)) {
        return true
      }
    },
    movieIdToGenre:function(id) {
      let that = this;

      for (var i = 0; i < this.movieGenres.length; i++) {
        if (id === that.movieGenres[i].id) {
          return that.movieGenres[i].name;
        }
      }
    },
    showIdToGenre:function(id) {
      let that = this;

      for (var i = 0; i < this.showGenres.length; i++) {
        if (id === that.showGenres[i].id) {
          return that.showGenres[i].name;
        }
      }
    },
    voteToStars: function(vote) {
      return Math.ceil(vote / 2);
    },
    getMovieCast: function(movieId) {
      let castNumber = 5

      let self = this;

      axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=8ef7b50081ce77b4e68be605e52ac6b2')
      .then(function(response) {
        for (var i = 0; i < castNumber; i++) {
          if (response.data.cast[i] !== undefined) {
            self.filmCast.push(response.data.cast[i]);
          }
        }
      });
    },
    getShowCast: function(showId) {
      let castNumber = 5

      let self = this;

      axios.get('https://api.themoviedb.org/3/tv/' + showId + '/credits?api_key=8ef7b50081ce77b4e68be605e52ac6b2')
      .then(function(response) {
        for (var i = 0; i < castNumber; i++) {
          if (response.data.cast[i] !== undefined) {
            self.showCast.push(response.data.cast[i]);
          }
        }
      });
    }
  }
});

Vue.config.devtools = true;
