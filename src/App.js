import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
// import Title from "./components/Title";
// import Navbar from "./components/NavBar";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import Container from "./components/Container";

import matches from "./gems.json";
import "./App.css";


let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a gem to claim it, but clicking on any one more than once forfeits the gem to Thanos!";

class App extends Component {
  // Setting this.state.friends to the friends json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };




 setClicked = id => {

        // Make a copy of the state matches array to work with
        const matches = this.state.matches;

        // Filter for the clicked match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // do the game over actions
        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "You've already clicked on that one, and now forfeit the gems to Thanos! All is Lost!"

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});

        // Otherwise, if clicked = false, and the user hasn't finished
        } else if (correctGuesses < 11) {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // increment the appropriate counter
            correctGuesses++;
            
            clickMessage = "Success! Another gem slips from Thanos grasp! Keep going!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // restart the guess counter
            correctGuesses = 0;

            // Egg on the user to play again
            clickMessage = "EXCELSIOR!!! You've claimed ALL the gems!! <br/>Try it again in an alternate Universe...";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        
        <nav className="navbar">
                <ul>
                    <li className="brand">Game of Stones</li>
                    <li className="scoreSummary textCenter">{this.state.clickMessage}</li>
                    <li className="scoreCount">Gems Collected: {this.state.correctGuesses} &nbsp;|&nbsp; High Score: {this.state.bestScore}</li>
                </ul>
            </nav>

        <Jumbotron></Jumbotron>
        <Container>
        {this.state.matches.map(match => (
          <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
          />
        ))}
        </Container>
        <Footer> </Footer>
      </Wrapper>
    );
  }
}

export default App;
