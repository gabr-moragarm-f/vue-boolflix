var app = new Vue({
  el: '#root',
  data:{
    userSearchInput: '',
    searchResultMovie: [],
    searchResultShows: []
  },
  methods:{
    searchMoviesAndShows: function() {
      this.searchMovies();

      this.searchShows();
    },
    searchMovies:function() {
      let self = this;

      axios.get('https://api.themoviedb.org/3/search/movie?api_key=8ef7b50081ce77b4e68be605e52ac6b2&query=' + encodeURI(this.userSearchInput))
      .then(function(response) {
        self.searchResultMovie = response.data.results
      });
    },
    searchShows:function() {
      let self = this;

      axios.get('https://api.themoviedb.org/3/search/tv?api_key=8ef7b50081ce77b4e68be605e52ac6b2&query=' + encodeURI(this.userSearchInput))
      .then(function(response) {
        self.searchResultShows = response.data.results
      });
    },
    voteToStars: function(vote) {
      return Math.ceil(vote / 2);
    }
  }
});

Vue.config.devtools = true;
