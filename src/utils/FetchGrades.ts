import {GetGrades, GetGradesProps, GradesProps} from "@/service/Grades/GradesGet";

async function FetchGrades({id}:GetGradesProps) {
    const grades = await GetGrades({id});
    if(grades) return grades;
}


export {FetchGrades};