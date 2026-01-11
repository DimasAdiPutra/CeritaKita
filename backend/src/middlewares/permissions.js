export const can = (permission) => {
	return (req, res, next) => {
		console.log(req.user)
		if (!req.user?.permissions?.includes(permission)) {
			return res.status(403).json({ message: 'Forbidden 🚫' })
		}
		next()
	}
}
