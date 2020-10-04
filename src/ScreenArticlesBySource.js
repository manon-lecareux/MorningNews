import React, {useState, useEffect} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux'

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([])

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    const findArticles = async() => {
      const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=2013e1d5900947f8a59249806e40063a`)
      const body = await data.json()
      setArticleList(body.articles) 
    }

    findArticles()    
  },[])

  var showModal = (title, content, image) => {
    setVisible(true)
    setTitle(title)
    setContent(content)
    setImage(image)

  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  var addfavorite = async(article) => {

    const data = await fetch('/addfavorite', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `imageFromFront=${article.urlToImage}&titleFromFront=${article.title}&contentFromFront=${article.content}&tokenFromFront=${props.searchToken}&langFromFront=${"?language?"}`
    })

    const body = await data.json()
  }

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
              {articleList.map((article,i) => (
                <div key={i} style={{display:'flex',justifyContent:'center'}}>

                <Card
                  
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="example"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content,article.urlToImage)} />,
                      <Icon type="like" key="ellipsis" onClick={()=> {addfavorite(article);{props.addToWishList(article)}}} />
                  ]}
                  >

                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>
                <Modal
                  title={title}
                  visible={visible}
                  footer={[
                    null, null,
                  ]}
                  onCancel={handleCancel}
                >
                  <img src={image} style={{width:"470px", marginBottom:"30px"}}/>
                  <p>{content}</p>
                </Modal>

              </div>

              ))}
              


            

           </div> 

         
      
      </div>
  );
}

function mapDispatchToProps(dispatch){
  return {
    addToWishList: function(article){
      dispatch({type: 'addArticle',
        articleLiked: article
      })
    },
    wishlistLoad: function(wishlist){
      dispatch({type: 'whishlistBDD',
        BDDlike: wishlist
      })
    },

  }
}

function mapStateToProps(state){
  return {searchToken:state.token}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource)
