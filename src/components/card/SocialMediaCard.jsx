const SocialMediaCard = ({
	key = '',
	name = '',
	icon = '',
	hoverIcon = '',
	redirectTo = '',
}) => {
	return (
		<a
			className="social_icon"
			key={key}
			href={redirectTo}
			target="_blank"
			rel="noreferrer"
			title={name}
		>
			<img className="default_icon" src={icon} alt={name} />
			<img className="hover_icon" src={hoverIcon} alt={name} />
		</a>
	)
}

export default SocialMediaCard
