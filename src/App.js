import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import { db, auth } from './firebase';
import ImageUpload from './ImageUpload';
import Post from './Post';



function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme) => (
  {
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }
))

function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser)
        if (authUser.displayName) {
          // don;t update username
        } else {
          return authUser.updateProfile({
            displayName: username
          })
        }
      } else {
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    db.collection("posts").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        post: doc.data(),
        id: doc.id
      })))
    })
  }, [])


  const signUp = (event) => {
    event.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch(error => alert(error.message))

    setOpen(false)
  }


  const signIn = event => {
    event.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message))

    setOpenSignIn(false)
  }

  return (
    <div className="App">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" className="app__headerImage" />

            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>SignUp</Button>
          </form>
        </div>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" className="app__headerImage" />

            </center>
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>SignIn</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
        {user ?
          <Button onClick={() => auth.signOut()}>
            Log Out
        </Button>
          :
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>
              Sign In
          </Button>
            <Button onClick={() => setOpen(true)}>
              Sign Up
          </Button>
          </div>
        }
      </div>
      <div className="app__posts">
        {
          posts.map(({ post, id }) => (<Post key={id} user={user} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />))
        }
      </div>

      {user?.displayName ?
        <ImageUpload username={user.displayName} />
        : <h3>Sorry you need to login to upload</h3>
      }
    </div>
  );
}

export default App;
