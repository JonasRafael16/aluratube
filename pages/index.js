import React from "react"
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'


function HomePage() {
  const styleHomePage = { //backgroundColor: "red"
  }
  const [filterValue, setSearchValue] = React.useState("")



  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "red",
      }}>
        <Menu filterValue={filterValue} setSearchValue={setSearchValue} />
        <Header />
        <TimeLine searchValue={filterValue} playlists={config.playlists} />
      </div>
    </>
  )
}


const StyleHeader = styled.div`
img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.user-info {
  display: flex;
  align-item: center;
  width: 100%;
  padding: 16px 32px;
  gap: 16px;
}
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;

function Header() {
  return (
    <StyleHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          {config.job}
        </div>
      </section>
    </StyleHeader>
  )
}

function TimeLine({ searchValue, ...props }) {
  const playlistsNames = Object.keys(props.playlists)
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistsName) => {
        const videos = props.playlists[playlistsName];
        return (
          <section key={playlistsName}>
            <h2>{playlistsName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalize = video.title.toLowerCase();
                const searchValueNormalize = searchValue.toLowerCase();
                return titleNormalize.includes(searchValueNormalize)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>

                  </a>
                )
              })}
            </div>
          </section>
        )
      })
      }
    </StyledTimeline>
  )
}

export default HomePage