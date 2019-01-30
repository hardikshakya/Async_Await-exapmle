const users = [{
    id: 1,
    name: 'Hardik',
    schoolId: 101
}, {
    id: 2,
    name: 'B',
    schoolId: 261
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 80
}, {
    id: 2,
    schoolId: 261,
    grade: 90
}, {
    id: 3,
    schoolId: 101,
    grade: 70
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });
        if(user){
            resolve(user);
        } else{
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (userId) => {
    var user;
    return getUser(userId).then((tempuser) => {
        user = tempuser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;

        if(grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length;
        }

        return `${user.name} has a $ ${average}% in the class.`;
    });
};

// getUser(31).then((user) => {
//     console.log(user);
    
// }).catch((e) => {
//     console.log(e);    
// });

// getGrades(101).then((grades) => {
//     console.log(grades);
    
// }).catch((e) => {
//     console.log(e);    
// });

getStatus(1).then((status) => {
    console.log(status);
    
}).catch((e) => {
    console.log(e);    
});