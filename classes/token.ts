import jwt from 'jsonwebtoken';
export default class Token{

    //clave secreta para firmar el jwt
    private static seed: string = 'epmmopBio';
    private static expires: string = '360d';

    static getJwtToken(payload: any): string {
        return jwt.sign(
            { usuario: payload },
            this.seed,
            { expiresIn: this.expires }
        );
    }

    static validateToken(userToken: string){
        return new Promise((resolve, reject) => {
            jwt.verify(userToken,this.seed, (err, decoded) => {
                if(err){
                   reject(); 
                }else{
                    resolve(decoded);
                }
            });
        });
        
    }
}