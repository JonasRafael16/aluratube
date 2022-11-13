import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";
import { RiVideoAddFill as AddIcon } from 'react-icons/ri';


function useForm(formProps) {
  const [videoValues, setVideoValues] = React.useState(formProps.initialValues)

  return {
    videoValues,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setVideoValues({
        ...videoValues,
        [name]: value,
      })
    },
    clearForm() {
      setVideoValues({})
    }
  };
}

const PROJECT_URL = "https://bagorjfquyvidaaxqswy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ29yamZxdXl2aWRhYXhxc3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjYwMDcsImV4cCI6MTk4Mzc0MjAwN30.ctwgbHyJyp44OZ44IBLJWPajmI8z8B2G6rBJ1QwCrKM";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getUrlThum(videoUrl) {
  return `https://img.youtube.com/vi/${videoUrl.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const registrationForm = useForm({
    initialValues: {}
  });
  const [visibleForm, setVisibleForm] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setVisibleForm(true)}>
        <AddIcon className="position-icon" />
      </button>

      {visibleForm
        && (
          <form onSubmit={(event) => {
            event.preventDefault();

            supabase.from("videos").insert({
              title: registrationForm.videoValues.title,
              url: registrationForm.videoValues.url,
              thumb: getUrlThum(registrationForm.videoValues.url),
              playlist: registrationForm.videoValues.playlist,
            })
              .then((result) => {
                alert("Video Inserido!")

              })
              .catch((error) => {
                console.log(error);
              })

            setVisibleForm(false);
            registrationForm.clearForm()
          }}>
            <div>
              <button
                type="button"
                className="close-modal" onClick={() => setVisibleForm(false)}>
                x
              </button>
              <input placeholder="Titulo do vídeo"
                name="title"
                value={registrationForm.videoValues.title}
                onChange={registrationForm.handleChange}
                required
              />
              <input placeholder="URL"
                name="url"
                value={registrationForm.videoValues.url}
                onChange={registrationForm.handleChange}
                required
              />
              <select name="playlist" onChange={registrationForm.handleChange} required>
                <option value={"jogos"}>Jogos</option>
                <option value={"filmes"}>Filmes</option>
                <option value={"musicas"}>Músicas</option>
                <option value={"tecnologia"}>Tecnologia</option>
              </select>
              <button type="submit">
                Cadastrar
              </button>
            </div>
          </form>
        )
      }
    </StyledRegisterVideo>
  )
}