import React from "react";
import config from "../config.json";
import { StyledHeader, StyledBanner } from './styles';
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline';
import { videoService } from "../src/service/videoService";

function HomePage() {
  const service = videoService()
  const [filterValue, setSearchValue] = React.useState("")
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
		console.log('useEffect')
		service.getAllVideos()
			.then((result) => {
				console.log(result.data)
				const newPlaylists = { ...playlists }
				result.data.forEach((video) => {
					if (!newPlaylists[video.playlist]) {
						newPlaylists[video.playlist] = []
					}
					newPlaylists[video.playlist].push(video)
				})
				setPlaylists(newPlaylists)
			})

	}, [])


  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <Menu filterValue={filterValue} setSearchValue={setSearchValue} />
        <Header />
        <TimeLine searchValue={filterValue} playlists={playlists} >
          Conteúdo
          </TimeLine>
      </div>
    </>
  )
}

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