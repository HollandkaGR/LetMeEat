export const setEttermek = (state, ettermek) => {
  state.ettermek = ettermek
}

export const resetEttermek = (state) => {
  state.ettermek = []
}

export const setSelectedEtterem = (state, etterem) => {
  state.selectedEtterem = etterem
}

export const modalToggle = (state) => {
  state.modalOpened = !state.modalOpened
}
