import React, { useState } from "react";
import { StyledRegisterVideo } from "./styles";

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

export default function RegisterVideo() {
  const registrationForm = useForm({
    initialValues: { title: "teste", url: "https://you..." }
  });
  const [visibleForm, setVisibleForm] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setVisibleForm(true)}>
        +
      </button>

      {visibleForm
        && (
          <form onSubmit={(event) => {
            event.preventDefault();
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
              />
              <input placeholder="URL"
                name="url"
                value={registrationForm.videoValues.url}
                onChange={registrationForm.handleChange}
              />
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