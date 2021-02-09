var app = new Vue({
  el: '#root',
  data:{
    userSearchInput: '',
    searchResult: []
  },
  methods:{
    searchMovie: function() {
      let self = this;
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=8ef7b50081ce77b4e68be605e52ac6b2&query=' + encodeURI(this.userSearchInput))
      .then(function(response) {
        self.searchResult = response.data.results
      });
    }
  }
});

Vue.config.devtools = true;
