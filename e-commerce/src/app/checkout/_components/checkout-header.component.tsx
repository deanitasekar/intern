"use client";

import { Breadcrumb } from "@/components/breadcrumb.component";
import { Check } from "lucide-react";

type CheckoutStep = "shipping" | "review" | "success";

interface CheckoutHeaderProps {
  currentStep: CheckoutStep;
}

export function CheckoutHeader({ currentStep }: CheckoutHeaderProps) {
  const getBreadcrumbLabel = () => {
    switch (currentStep) {
      case "success":
        return "Order Confirmation";
      case "shipping":
      case "review":
      default:
        return "Checkout";
    }
  };

  const breadcrumbItems = [{ label: getBreadcrumbLabel() }];

  const steps = [
    {
      id: "shipping",
      label: "Shipping",
      number: 1,
    },
    {
      id: "review",
      label: "Review & Payments",
      number: 2,
    },
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    const currentIndex = steps.findIndex((step) => step.id === currentStep);

    if (currentStep === "success") {
      return "completed";
    }

    if (stepIndex < currentIndex) {
      return "completed";
    } else if (stepIndex === currentIndex) {
      return "current";
    } else {
      return "upcoming";
    }
  };

  const getStepClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#7DB800] text-white";
      case "current":
        return "bg-[#7DB800] text-white";
      case "upcoming":
      default:
        return "bg-gray-300 text-white";
    }
  };

  const getConnectorClasses = (index: number) => {
    const nextStepStatus = getStepStatus(steps[index + 1]?.id);
    return nextStepStatus === "completed" || nextStepStatus === "current"
      ? "bg-[#7DB800]"
      : "bg-gray-300";
  };

  const getTextClasses = (status: string) => {
    return status === "current" ? "text-gray-900" : "text-gray-500";
  };

  return (
    <div className="container-lg mx-auto px-6 pt-8 pb-4 md:mt-2">
      <div className="py-2 mb-6">
        <Breadcrumb
          items={breadcrumbItems}
          separator=" > "
          className="text-sm"
        />
      </div>

      {currentStep !== "success" && (
        <div className="pb-8">
          <div className="flex items-start justify-center space-x-4">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const isCompleted = status === "completed";

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getStepClasses(
                        status
                      )}`}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium max-w-20 justify-center text-center ${getTextClasses(
                        status
                      )}`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 h-0.5 mt-1 ml-4 ${getConnectorClasses(
                        index
                      )}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
