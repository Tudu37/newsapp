import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

 const News = (props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
 
  const capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const  updateNews = async (cpage)=> {
    props.setProgress(20)
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.category
    }&apiKey=${props.apiKey}&page=${
      page + cpage
    }&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50)
    let parseData = await data.json();
    props.setProgress(70)
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `${capitalise(props.category)} - NewsMonkey`;
    updateNews(1)      //later try 0 value for componentDidMount
  }, [])

  const handlePrevClick = async () => {
    console.log("prevoius");
    setPage(page-1)
    await updateNews(-1);
  };

  const handleNextClick = async () => {
    console.log("next");
    setPage(page+1)
    await updateNews(+1);
  };

  const fetchMoreData = async () => {
    setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    setLoading(false)
  };

  
    return (
      <>
        <h1 className="text-center" style={{marginTop :'60px'}}>NewsMonkey - Top Headlines</h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={page<=1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
        <button type="button" disabled={page+1 >Math.ceil(totalResults/props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  
}

News.defaultProps = {   
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {   
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News