import React, {Component} from "react";
import {withAuth} from "../../Services/WithAuthentication";
import axios from "axios";
import PropertySummary from "../../Shared/Properties/PropertySummary";


export default class VisitingListScreen extends Component {
  state = {properties: []};

  getVisitingList = async () => {
    try {
      const response = await axios.get("/visitingList");
      this.setState({properties: response.data})
    } catch(error) {
      console.error("Error fetching visiting list");
    }
  };

  componentDidMount() {
    withAuth(this.getVisitingList.bind(this));
  }

  render() {
    return <main>
      <h1>Visiting List</h1>
      <div>
        {!this.state.properties.length && "No items in visiting list"}
        {this.state.properties.map(property =>
          <PropertySummary key={property._id} {...property}/>)}
      </div>
    </main>;
  }
}