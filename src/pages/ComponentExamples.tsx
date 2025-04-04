
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Switch } from "../components/ui/switch";
import { Chip, ChipGroup } from "../components/ui/chip";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Calendar, Check, Mic, Search, Sparkles } from "lucide-react";
import ChipsDemo from "../components/examples/ChipsDemo";
import SnackbarDemo from "../components/examples/SnackbarDemo";

const ComponentExamples = () => {
  const [switchValue, setSwitchValue] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("option1");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Material Design 3 Components</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Filled Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="filled">Default</Button>
                <Button variant="filled" disabled>Disabled</Button>
                <Button variant="filled" shape="pill">Rounded</Button>
              </div>
            </div>
            
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Tonal Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="tonal">Default</Button>
                <Button variant="tonal" disabled>Disabled</Button>
                <Button variant="tonal" shape="pill">Rounded</Button>
              </div>
            </div>
            
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Outlined Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outlined">Default</Button>
                <Button variant="outlined" disabled>Disabled</Button>
                <Button variant="outlined" shape="pill">Rounded</Button>
              </div>
            </div>
            
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Text Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="text">Default</Button>
                <Button variant="text" disabled>Disabled</Button>
                <Button variant="text" shape="pill">Rounded</Button>
              </div>
            </div>
            
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Elevated Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="elevated">Default</Button>
                <Button variant="elevated" disabled>Disabled</Button>
                <Button variant="elevated" shape="pill">Rounded</Button>
              </div>
            </div>
            
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Icon Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="filled" size="icon"><Search /></Button>
                <Button variant="tonal" size="icon"><Mic /></Button>
                <Button variant="outlined" size="icon"><Sparkles /></Button>
                <Button variant="text" size="icon"><Calendar /></Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Selection Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Checkbox</h3>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={checkboxValue} 
                  onCheckedChange={() => setCheckboxValue(!checkboxValue)} 
                />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms-disabled" disabled />
                <Label htmlFor="terms-disabled" className="text-muted-foreground">Disabled option</Label>
              </div>
            </div>
            
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Radio Buttons</h3>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="option3" disabled />
                  <Label htmlFor="option3" className="text-muted-foreground">Disabled option</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
              <h3 className="text-lg font-medium">Switch</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="airplane-mode" 
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-switch" disabled />
                <Label htmlFor="disabled-switch" className="text-muted-foreground">Disabled</Label>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Chips</h2>
          <ChipsDemo />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Dialog</h2>
          <div className="p-6 bg-background rounded-xl border shadow-sm space-y-4">
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="filled">Open Basic Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Basic dialog title</DialogTitle>
                    <DialogDescription>
                      A dialog is a modal window that appears in front of app content to provide critical information or ask for a decision
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="text">Cancel</Button>
                    <Button variant="text">OK</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="filled">Open Form Dialog</Button>
                </DialogTrigger>
                <DialogContent size="lg">
                  <DialogHeader>
                    <DialogTitle>Full-screen dialog title</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="event-name">Event name</Label>
                      <Input id="event-name" placeholder="Event name" />
                    </div>
                    <div>
                      <Label>From</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Label className="text-muted-foreground text-xs">Date</Label>
                          <Input placeholder="MM/DD/YYYY" />
                        </div>
                        <div>
                          <Label className="text-muted-foreground text-xs">Time</Label>
                          <Input placeholder="--:-- --" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>To</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Label className="text-muted-foreground text-xs">Date</Label>
                          <Input placeholder="MM/DD/YYYY" />
                        </div>
                        <div>
                          <Label className="text-muted-foreground text-xs">Time</Label>
                          <Input placeholder="--:-- --" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="text">Cancel</Button>
                    <Button variant="text">Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Snackbar</h2>
          <SnackbarDemo />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComponentExamples;
