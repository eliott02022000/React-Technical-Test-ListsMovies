import React, { Component } from 'react';
import { movies$ } from '../Services/Movies';
// import { NavLink } from 'react-router-dom'
import "../style/style.css"
import Switch from "react-switch";
import Pagination from "react-js-pagination";

export default class ListsMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // librairie: movies,
            data: [],
            datasource: [],
            categories: [],
            activePage: 1,
        };   

        // this.delete = this.delete.bind(this);
    }

    getCategories() {
        const { data } = this.state;
        // console.log(data)
        this.setState({
            categories: Object.keys(data.reduce((acc, value) => {    
                acc[value.category] = true;
                return acc;
            }, {}))
        });
    }

    componentDidMount() {
        movies$.then((data) => {
            data.map(item => {
                item.liked = false;
            });
            // console.log(data)
            this.setState({
                data: data,
                datasource: data
            }, () => this.getCategories());
            
        })
    }

    triggerDelete(id){
        if(window.confirm("Are you sure you want to delete this movie?")){
            const { data } = this.state;
            const el = data.find(movie => movie.id === id);
            data.splice(data.indexOf(el), 1);
            this.setState({ data });

        }
    }

    changeCategory(event) {
        const value = event.target.value
        if (value === "") {
            this.setState({
                data: this.state.datasource
            })
            return
        }
        const data = this.state.datasource.filter(item => item.category === event.target.value);
        this.setState({ data });
    }

    handleChange(checked, item) {
        // console.log(checked)
        // this.setState({ checked });
        const found = this.state.datasource.find(element => element === item);
        if (found) {
            if (found.liked === true) {
                found.likes -= 1;
                found.liked = false;
            } else {
                found.likes += 1;
                found.liked = true;
            }
            this.setState({ datasource: this.state.datasource });
        }
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

    render() {
        return(
            <div>
                <div id="mymovies">
                    <h1>Every Movies are here ...</h1>
                </div>
                <select onChange={(event) => this.changeCategory(event)}>
                    <option> </option>
                    {this.state.categories.map(item => (
                        <option value={item}>{item}</option>
                    ))}
                </select>
                
                <div>
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={4}
                    totalItemsCount={10}
                    pageRangeDisplayed={5}
                    // onChange={::this.handlePageChange}
                    />
                </div>
                
                <ul>
                    {this.state.data.map((item) => {
                        return(
                            <li key={item.id} className="row">
                                <div className="ourcard">
                                    <div className='card'>
                                        <img src="https://placeimg.com/380/230/nature" className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h1 className="mycard-title">{item.title}</h1>
                                            <p className="mycard-category">{item.category}</p>
                                        </div>
                                        <div className="mylikes">
                                            <p >Likes {item.likes}</p>
                                            <p>Dislikes {item.dislikes}</p>
                                            <button onClick={(e)=>{
                                                e.stopPropagation();
                                                e.preventDefault();
                                                this.triggerDelete(item.id);
                                            }}> Delete Movie
                                            </button> 
                                            <label>
                                                <span>Switch for a like</span>
                                                <Switch onChange={(checked)=> this.handleChange(checked, item)} checked={item.liked} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>

                
            </div>     
        )
    }

}