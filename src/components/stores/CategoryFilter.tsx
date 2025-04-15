
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { useState } from "react";

interface CategoryFilterProps {
  categories: Category[];
  onCategoryChange: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const CategoryFilter = ({ categories, onCategoryChange, selectedCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className={selectedCategory === null ? "bg-directorio-500 hover:bg-directorio-600" : "border-directorio-200"}
      >
        Todos
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={selectedCategory === category.id ? "bg-directorio-500 hover:bg-directorio-600" : "border-directorio-200"}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
