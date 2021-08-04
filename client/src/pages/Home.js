import { Button, Card, CardContent, CardActions, Typography, Toolbar, AppBar, TextField, IconButton } from '@material-ui/core'
import { DeleteForever, Favorite } from '@material-ui/icons'

var React = require('react');


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.getQuotes = this.getQuotes.bind(this);
    this.postQuote = this.postQuote.bind(this);
    this.deleteQuote = this.deleteQuote.bind(this);

    this.state = {
      quoteList: [{}],
    };
  }

  async getQuotes() {
    var requestOptions = {
      method: 'get'
    };

    await fetch('/api/quotes', requestOptions)
      .then((resp) => resp.json())
      .then((row) => {
        this.setState({ quoteList: row });
      });

    console.log("list of quotes:" + JSON.stringify(this.state.quoteList));
  }

  async componentDidMount() {
    await this.getQuotes();
  }

  async postQuote(event) {
    event.preventDefault();

    if (this.refs.author === "" || this.refs.quote === "") {
      return;
    }

    var InputFields = {
      author: document.getElementById('author').value,
      quote: document.getElementById('quote').value
    };

    await fetch('/api/quotes', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(InputFields)
    });
    await this.getQuotes();

    document.getElementById('author').value = "";
    document.getElementById('quote').value = "";
  }

  async deleteQuote(event, id) {

    //var result = window.confirm("Are you sure you want to delete this quote?");

    await fetch(`api/quotes/${id}`, {
      method: 'delete'
    });
    await this.getQuotes();

  }

  render() {
    return (
      <div className="App">
        <AppBar position="static" className="AppBar">
          <Toolbar>
            <Typography variant="h6">
              Inspirational Quotes!
          </Typography>
          </Toolbar>
        </AppBar>
        <table>
          <tbody>
            <tr>
              <td width="200" />
              <td>
                <div align="center" position="top">
                  <form autoComplete="off" noValidate onSubmit={this.postQuote}>
                    <TextField variant="outlined" id="author" required label="Author" defaultValue="Bard" /> <br />
                    <br /><TextField variant="outlined" id="quote" multiline required rowsMax="5" type="text" label="Quote" defaultValue="A bear has a long long tail--" /> <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">Add Quote</Button>
                  </form>
                </div>
              </td>
              <td width="300" />
              <td>
                <div align="left">
                  {
                    Array.from(this.state.quoteList).map((quote, i) => {
                      return (
                        <Card variant="outlined" className="Card" key={i}>
                          <CardContent>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              Added: {new Date((new Date(quote.timestamp) - new Date(quote.timestamp).getTimezoneOffset() * 60 * 1000)).toString("yyyy, MMM dd hh:mm:ss")}
                            </Typography>
                            <Typography paragraph>
                              {quote.quote}
                            </Typography>
                            <Typography variant="subtitle2">
                              -{quote.author}
                            </Typography>
                            <CardActions disable-spacing="true">
                              <Favorite />
                              <IconButton onClick={(e) => { this.deleteQuote(e, quote.id) }}>
                                <DeleteForever />
                              </IconButton>
                            </CardActions>
                          </CardContent>
                        </Card>
                      )
                    })
                  }
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Home;
