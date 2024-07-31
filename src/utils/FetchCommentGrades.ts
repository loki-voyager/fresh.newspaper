import {GetGradesProps} from "@/service/Grades/GradesGet";
import {ComGradesProps, GetComGrades} from "@/service/Grades/CommentsGradesGet";

async function FetchCommentGrades({id}:GetGradesProps) {
    const {likes,dislikes}:ComGradesProps = await GetComGrades({id: id});
    return {likes, dislikes};
}

export {FetchCommentGrades};