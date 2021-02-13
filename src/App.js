import React, {useState} from 'react'
import {useQuery, gql} from "@apollo/client";
import Box from './designer/Box'
import TopBar from './designer/TopBar'

const styledDiv = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}

const styledDivButton = {
    width: 200,
    display: 'flex',
    justifyContent: 'space-between'
}

const QUERY_RECENT = gql`
  query {
    posts { 
        edges { 
          node { id, name, description , url} 
        } 
    }
  }
`
const QUERY_NEWEST = gql`
  query {
    posts(order: NEWEST) { 
        edges { 
          node { id, name, description , url} 
        } 
    }
  }
`

function App() {
    const [query, setQuery] = useState(QUERY_RECENT)
    const {loading, error, data} = useQuery(query)

    const entry = data?.posts.edges

    if(loading) return <div>Loading..</div>
    if(error) return <div>Error..</div>

    return (
        <div className="App">
            <TopBar>
                <div style={styledDivButton}>
                    <button onClick={() => setQuery(QUERY_RECENT)}>Popular</button>
                    <button onClick={() => setQuery(QUERY_NEWEST)}>Newest</button>
                </div>
            </TopBar>
            <div style={styledDiv}>
                {entry.map(val => {
                    return (
                    <Box>
                          <div key={val.node.id}>
                              <a href={val.node.url}>
                                <h1>{val.node.name}</h1>
                              </a>
                              <p>{val.node.description}</p>
                          </div>
                  </Box>
              )
            })}
        </div>
    </div>
  );
}

export default App;
