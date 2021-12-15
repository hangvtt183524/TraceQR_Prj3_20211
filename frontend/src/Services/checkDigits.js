const isAllDigits = (s) => {
    if (!isNaN(s)) {
        if (s.includes('.') || s.includes(',') || s.includes('-') || s.includes(' ')) return false;
        return true;
    }

    return false;
}

export default isAllDigits;