export const setOrderModalRef = (state, modalRef) => {
  state.orderModalRef = modalRef
}

export const setEttermek = (state, ettermek) => {
  state.ettermek = ettermek
}

export const resetEttermek = (state) => {
  state.ettermek = []
}

export const setSelectedEtterem = (state, etterem) => {
  state.selectedEtterem = etterem
}

export const setTimestamp = (state, timestamp) => {
  state.timestamp = timestamp
}
