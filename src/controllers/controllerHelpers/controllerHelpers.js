function GenerateError(res){
    res.status(500).json({ message: 'Server error' });
}

exports = GenerateError;