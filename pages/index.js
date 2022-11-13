import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'


function HomePage() {
  const styleHomePage = { //backgroundColor: "red"
  }
  const [filterValue, setSearchValue] = React.useState("")



  return (
    <>

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


const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-color: #0F1F37;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;

function Header() {
  return (
    <StyledHeader>
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
    </StyledHeader>
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