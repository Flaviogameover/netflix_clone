export default {
    BaseImageUrl: (size,image)=>{
        let base_url = `https://image.tmdb.org/t/p/${size}${image}`;
        return base_url;
    }
}
