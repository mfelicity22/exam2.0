export function ageChecker(req, res, next) {
    const { age } = req.body;

    if (!age) {
        return res.json({ message: "Age is required" });    

    }

    if (age < 18) {
        return res.json({ message: "You are not allowed to proceed" });
}

next();
}