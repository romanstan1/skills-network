//
// let currentConnectedLinks = []
// let desiredConnectedLinks = []
// let partitionedCurrentLinks = []
// let partitionedDesiredLinks = []
//
// export default function draw(d, bool, width, height, context, links) {
//   context.clearRect(0,0, width, height)
//   if(d && bool) dClick = d
//   else if (d && !bool) dClick = null
//   const currentLinks = links.filter(link => link.type === 'currentSkills' )
//   const desiredLinks = links.filter(link => link.type === 'desiredSkills')
//
//   if(d) { // set new links arrays
//     currentConnectedLinks = links.filter(link => link.type === 'currentSkills' && (d.id === link.source.id || d.id === link.target.id))
//     desiredConnectedLinks = links.filter(link => link.type === 'desiredSkills' && (d.id === link.source.id || d.id === link.target.id))
//     partitionedCurrentLinks = currentLinks.filter(link => !currentConnectedLinks.includes(link))
//     partitionedDesiredLinks = desiredLinks.filter(link => !desiredConnectedLinks.includes(link))
//   }
//
//   const drawLink = (link) => {
//     context.moveTo(link.source.x, link.source.y)
//     context.lineTo(link.target.x, link.target.y)
//   }
//
//   const configureContext = (linkCategory, gapSize, connected) => {
//     context.lineWidth = 1
//     if(connected) context.strokeStyle = 'rgba(211, 171, 158, 0.8)'
//     else context.strokeStyle = 'rgba(53, 58, 68,1)'
//     context.beginPath()
//     context.setLineDash([10, gapSize])
//     linkCategory.forEach(link => drawLink(link))
//     context.stroke()
//   }
//
//   if(dClick) {
//     configureContext(partitionedCurrentLinks, 0, false)
//     configureContext(partitionedDesiredLinks, 6, false)
//     configureContext(currentConnectedLinks, 0, true)
//     configureContext(desiredConnectedLinks, 6, true)
//   } else {
//     configureContext(currentLinks, 0, true)
//     configureContext(desiredLinks, 6, true)
//   }
// }
