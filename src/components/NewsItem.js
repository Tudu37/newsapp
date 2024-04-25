import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card" >
          <div  style={{display: 'flex',justifyContent: 'flex-end',position: 'absolute',right: '0'}}>
          <span className=" badge rounded-pill bg-danger" >
        {source}
         </span>
          </div>
        
          <img
            src={imageUrl}
            className="card-img-top"
            alt="..."
            height="190px"
            width="50px"
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {date}</small></p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark btn-primary"
            >
              Read More..
            </a>
          </div>
        </div>
      </div>
      
    );
  }
}
