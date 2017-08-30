if (process.env.NODE_ENV === 'development' && module.hot) {
    console.clear();
    module.hot.accept();
}
