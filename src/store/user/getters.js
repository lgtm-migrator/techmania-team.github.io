export function getUserData (state) {
  const data = { ...state, avatar_url: `https://cdn.discordapp.com/avatars/${state.id}/${state.avatar}.png` }
  return data
}
