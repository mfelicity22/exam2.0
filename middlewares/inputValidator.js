export function validator(req, res, next) {
    const { name, price} = req.body;

    if (!name || typeof name !== 'string') {
        return res.json({ message: "Invalid or missing 'name'" });
    }

    if (!price || typeof price !== 'number' || price <= 0) {
        return res.json ({ message: "Invalid or missing 'price'" });
    }
    next();
}