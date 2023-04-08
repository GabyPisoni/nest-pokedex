import { IsOptional, Min } from "@nestjs/class-validator";
import { IsPositive } from "class-validator";

export class PaginationDto{
    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?:number;

    @IsOptional()
    @IsPositive()
    offset?:number;
}