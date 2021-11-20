import {rest} from 'msw';


export const handlers = [
    rest.get('http://localhost:3001/api/login',(req,res,ctx)=>{
        return res(
            ctx.json({username: 'testuser', fullname: 'Test User'})
        )
    })
]