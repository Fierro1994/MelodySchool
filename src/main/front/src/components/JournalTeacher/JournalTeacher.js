
import style from './journal.module.css';


const initialStudent = {
    userFirstName:'',
    userLastName: '',
    userGrade:''
}

function JournalTeacher (){
    return (
      <div className={style.journal_container}>
        <div className={style.header}>
             <h2>Журнал преподователя</h2>
        </div>
        <div className={style.table_container}>
            <table>
                <th>№</th>
                <th>Ф.И.О</th>  
                <th>Предмет</th> 
                <th>Оценка</th> 

                <tbody>


                </tbody>
            </table>
        </div>
           
      </div>    
    );
  }
  
  export default JournalTeacher;
  
      
   

