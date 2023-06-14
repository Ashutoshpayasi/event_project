export default function Preview({post}){
    console.log(post);
    return<div id="preview-image">
        <img src={post} alt = "Preview" />
    </div>
}