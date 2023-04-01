const findShortcut = (shortcuts, keys) => {
    return shortcuts
        .find(st =>
            Object.assign([], st.keys)
                .sort()
                .join(',') ===
            keys
                .sort()
                .join(',')
        );
}

export default findShortcut;
