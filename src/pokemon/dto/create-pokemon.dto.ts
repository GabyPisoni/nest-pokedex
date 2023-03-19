import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    //isInt , isPositive , min1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;
    //isString , minLength
    @MinLength(1)
    @IsString()
    name: string;

}
