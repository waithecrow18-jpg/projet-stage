/**
 * Badge.jsx — Petit pillulé coloré pour les statuts ou catégories
 *
 * @param {object} props
 * @param {string} props.label - Texte à afficher
 * @param {'green'|'blue'|'amber'|'red'|'gray'} [props.color='green'] - Couleur de base du badge
 */
export default function Badge({ label, color = 'green', className = '' }) {
  const colorMap = {
    green: { text: '#0F6E56', bg: 'rgba(15, 110, 86, 0.15)' },
    blue:  { text: '#185FA5', bg: 'rgba(24, 95, 165, 0.15)' },
    amber: { text: '#BA7517', bg: 'rgba(186, 117, 23, 0.15)' },
    red:   { text: '#E53E3E', bg: 'rgba(229, 62, 62, 0.15)' },
    gray:  { text: '#5A6A65', bg: 'rgba(90, 106, 101, 0.15)' },
  }

  const selectedColor = colorMap[color] || colorMap.green

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${className}`}
      style={{
        backgroundColor: selectedColor.bg,
        color: selectedColor.text,
        fontFamily: 'var(--font-body)',
      }}
    >
      {label}
    </span>
  )
}
