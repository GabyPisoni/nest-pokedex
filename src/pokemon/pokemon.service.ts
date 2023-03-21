import { BadRequestException, HttpCode, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) { }
  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
     
        const pokemon = await this.pokemonModel.create(createPokemonDto);

        return pokemon;
     

    } catch (error) {

      this.handleExeption(error)
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
      return pokemon;

    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);

    }


    if (!pokemon) {

      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });

    }

    if (!pokemon) {

      throw new NotFoundException(`Pokemon con el id o nombre "${term}" no encontrado`)

    }
    return pokemon;

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //return `This action updates a #${term} pokemon`;
    const pokemonResult = await this.findOne(term);
    console.log("Esto es pokemon result", pokemonResult)
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      await pokemonResult.updateOne(updatePokemonDto);

      return { ...pokemonResult.toJSON(), ...updatePokemonDto };


    } catch (error) {
      this.handleExeption(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
  handleExeption(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`El pokemon existe en la db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Problema al crear dato - chequear los  logs del servidor `)

  }
}
