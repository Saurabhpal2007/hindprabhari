
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { SegmentedButton } from "../ui/segmented-button";
import { MaterialToggleGroup } from "../ui/material-toggle-group";
import { EnhancedTooltip, EnhancedTooltipContent, EnhancedTooltipProvider, EnhancedTooltipTrigger } from "../ui/enhanced-tooltip";

const MaterialDesignDemo: React.FC = () => {
  const [selected, setSelected] = useState("technology");
  const [priceRange, setPriceRange] = useState("$$");

  return (
    <div className="space-y-10 p-6 bg-background border rounded-xl">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Material Design 3 Components</h3>
        <p className="text-muted-foreground">Example components implementing Material Design 3 principles</p>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-4">Tooltips</h4>
        <div className="flex flex-wrap gap-6">
          <EnhancedTooltipProvider>
            <EnhancedTooltip>
              <EnhancedTooltipTrigger asChild>
                <Button variant="outlined" shape="pill">Plain tooltip</Button>
              </EnhancedTooltipTrigger>
              <EnhancedTooltipContent variant="plain">
                Simple tooltip
              </EnhancedTooltipContent>
            </EnhancedTooltip>

            <EnhancedTooltip>
              <EnhancedTooltipTrigger asChild>
                <Button variant="filled" shape="pill">Rich tooltip</Button>
              </EnhancedTooltipTrigger>
              <EnhancedTooltipContent variant="rich" title="Rich tooltip">
                Rich tooltips bring attention to a particular element of feature that warrants the user's focus. It supports multiple lines of informational text.
                <div className="pt-2">Action</div>
              </EnhancedTooltipContent>
            </EnhancedTooltip>
          </EnhancedTooltipProvider>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-4">Text Fields</h4>
        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="text-sm text-muted-foreground mb-1">Text field</div>
              <div className="font-medium">Filled</div>
            </div>
            <div className="text-xs text-muted-foreground">Supporting text</div>
          </div>
          <div className="space-y-2">
            <div className="border rounded-md p-4">
              <div className="text-sm text-muted-foreground mb-1">Text field</div>
              <div className="font-medium">Outlined</div>
            </div>
            <div className="text-xs text-muted-foreground">Supporting text</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-4">Segmented Buttons</h4>
        <div className="flex flex-col gap-6">
          <div>
            <h5 className="text-sm font-medium mb-3">Category Toggle</h5>
            <SegmentedButton
              options={[
                { value: "technology", label: "Technology" },
                { value: "politics", label: "Politics" },
                { value: "sports", label: "Sports" },
                { value: "entertainment", label: "Entertainment" }
              ]}
              value={selected}
              onChange={setSelected}
            />
          </div>

          <div className="flex gap-6 items-center">
            <div>
              <h5 className="text-sm font-medium mb-3">Standard Toggle</h5>
              <MaterialToggleGroup
                options={[
                  { value: "selected", label: "Selected" },
                  { value: "enabled1", label: "Enabled" },
                  { value: "enabled2", label: "Enabled" }
                ]}
                defaultValue="selected"
              />
            </div>

            <div>
              <h5 className="text-sm font-medium mb-3">Price Range</h5>
              <MaterialToggleGroup
                variant="price"
                options={[
                  { value: "$", label: "$" },
                  { value: "$$", label: "$$" },
                  { value: "$$$", label: "$$$" },
                  { value: "$$$$", label: "$$$$" }
                ]}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as string)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-4">Selection Controls</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h5 className="text-sm font-medium">Checkboxes</h5>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox-default" />
                <Label htmlFor="checkbox-default">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox-sm" size="sm" />
                <Label htmlFor="checkbox-sm">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox-lg" size="lg" />
                <Label htmlFor="checkbox-lg">Large</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h5 className="text-sm font-medium">Radio Buttons</h5>
            <RadioGroup defaultValue="option-1" className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="radio-1" />
                <Label htmlFor="radio-1">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="radio-2" size="sm" />
                <Label htmlFor="radio-2">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-3" id="radio-3" size="lg" />
                <Label htmlFor="radio-3">Large</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <h5 className="text-sm font-medium">Switches</h5>
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="switch-default" />
                <Label htmlFor="switch-default">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch-sm" size="sm" />
                <Label htmlFor="switch-sm">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch-lg" size="lg" />
                <Label htmlFor="switch-lg">Large</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDesignDemo;
