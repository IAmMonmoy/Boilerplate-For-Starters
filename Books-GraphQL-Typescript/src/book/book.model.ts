import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BookModel {
  @Field()
  bookId: string;

  @Field()
  title: string;

  @Field()
  year: number 

  @Field()
  description?: string
}