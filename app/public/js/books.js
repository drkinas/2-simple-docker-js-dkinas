
const SomeApp = {
  data() {
    return {
      students: [],
      bookForm: {}
    }
  },
  computed: {},
  methods: {
      fetchStudentData() {
          fetch('/api/books/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.students = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      postNewOffer(evt) {
        this.bookForm.studentId = this.students.id;

        console.log("Creating!", this.bookForm);

        fetch('api/books/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.students = json;
            
            this.bookForm={};
          });
      }
  },
  created() {
      this.fetchStudentData();
  }

}

Vue.createApp(SomeApp).mount('#offerApp');
