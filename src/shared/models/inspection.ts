export interface SourceLocation {
  file: string;
  line?: number;
  column?: number;
}

export interface ComponentInfo {
  framework: 'angular' | 'react' | 'vue' | 'unknown';
  name?: string;
  source?: SourceLocation;
}

export interface TemplateInfo {
  file?: string;
  line?: number;
  column?: number;
}

export interface BindingInfo {
  type?: string;
  expression?: string;
  source?: SourceLocation;
}

export interface InspectionResult {
  element: {
    tagName: string;
    id?: string;
    classes: string[];
  };

  component?: ComponentInfo;

  template?: TemplateInfo;

  binding?: BindingInfo;
}