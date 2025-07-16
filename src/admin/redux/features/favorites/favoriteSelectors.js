export const makeSelectIsFavorite = (id) => (state) => {
    return !!state.favorites.favoriteMap[id]
}